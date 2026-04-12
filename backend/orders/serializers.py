from decimal import Decimal
from django.db import transaction
from rest_framework import serializers
from .models import Order, OrderItem
from products.models import Product


class CheckoutItemSerializer(serializers.Serializer):
    product_id = serializers.IntegerField()
    quantity = serializers.IntegerField(min_value=1)


class CheckoutSerializer(serializers.Serializer):
    full_name = serializers.CharField(max_length=255)
    email = serializers.EmailField()
    phone = serializers.CharField(max_length=30)
    address = serializers.CharField()
    city = serializers.CharField(max_length=100)
    postal_code = serializers.CharField(max_length=20, required=False, allow_blank=True)
    country = serializers.CharField(max_length=100, required=False, default="Bangladesh")
    items = CheckoutItemSerializer(many=True)

    def validate_items(self, value):
        if not value:
            raise serializers.ValidationError("Your cart is empty.")
        return value

    @transaction.atomic
    def create(self, validated_data):
        items_data = validated_data.pop("items")
        user = validated_data.pop("user", None)

        subtotal = Decimal("0.00")
        shipping_fee = Decimal("100.00") if items_data else Decimal("0.00")

        # First pass: validate all products and stock
        validated_products = []

        for item in items_data:
            product_id = item["product_id"]
            quantity = item["quantity"]

            try:
                product = Product.objects.select_for_update().get(id=product_id)
            except Product.DoesNotExist:
                raise serializers.ValidationError(
                    {"items": [f"Product with ID {product_id} does not exist."]}
                )

            if product.stock < quantity:
                raise serializers.ValidationError(
                    {
                        "items": [
                            f"Only {product.stock} unit(s) available for '{product.name}'."
                        ]
                    }
                )

            validated_products.append(
                {
                    "product": product,
                    "quantity": quantity,
                }
            )

        # Create order after validation passes
        order = Order.objects.create(
            user=user,
            **validated_data,
            subtotal=Decimal("0.00"),
            shipping_fee=shipping_fee,
            total_amount=Decimal("0.00"),
        )

        # Second pass: create items and deduct stock
        for item in validated_products:
            product = item["product"]
            quantity = item["quantity"]

            line_total = product.price * quantity
            subtotal += line_total

            OrderItem.objects.create(
                order=order,
                product=product,
                product_name=product.name,
                product_price=product.price,
                quantity=quantity,
                line_total=line_total,
            )

            product.stock -= quantity
            product.save()

        order.subtotal = subtotal
        order.total_amount = subtotal + shipping_fee
        order.save()

        return order


class OrderItemReadSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = ["id", "product_name", "product_price", "quantity", "line_total"]


class OrderReadSerializer(serializers.ModelSerializer):
    items = OrderItemReadSerializer(many=True, read_only=True)
    user = serializers.SerializerMethodField()

    class Meta:
        model = Order
        fields = [
            "id",
            "user",
            "full_name",
            "email",
            "phone",
            "address",
            "city",
            "postal_code",
            "country",
            "subtotal",
            "shipping_fee",
            "total_amount",
            "status",
            "created_at",
            "items",
        ]

    def get_user(self, obj):
        if obj.user:
            return {
                "id": obj.user.id,
                "username": obj.user.username,
                "email": obj.user.email,
            }
        return None