from rest_framework import serializers
from .models import Product


class ProductSerializer(serializers.ModelSerializer):
    id = serializers.SerializerMethodField()
    imageUrl = serializers.CharField(source="image")
    price = serializers.DecimalField(max_digits=10, decimal_places=2, coerce_to_string=False)
    rating = serializers.DecimalField(max_digits=3, decimal_places=1, coerce_to_string=False)

    class Meta:
        model = Product
        fields = [
            "id",
            "name",
            "price",
            "imageUrl",
            "category",
            "description",
            "rating",
            "reviews",
            "stock",
        ]

    def get_id(self, obj):
        return str(obj.id)