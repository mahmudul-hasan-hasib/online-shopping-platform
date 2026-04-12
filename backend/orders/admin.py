from django.contrib import admin
from .models import Order, OrderItem


class OrderItemInline(admin.TabularInline):
    model = OrderItem
    extra = 0
    readonly_fields = (
        "product",
        "product_name",
        "product_price",
        "quantity",
        "line_total",
    )
    can_delete = False


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "full_name",
        "email",
        "user",
        "status",
        "subtotal",
        "shipping_fee",
        "total_amount",
        "created_at",
    )
    list_filter = ("status", "created_at", "country", "city")
    search_fields = ("full_name", "email", "phone", "address")
    ordering = ("-created_at",)
    readonly_fields = (
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
        "created_at",
    )
    inlines = [OrderItemInline]

    fieldsets = (
        ("Customer Information", {
            "fields": (
                "user",
                "full_name",
                "email",
                "phone",
            )
        }),
        ("Shipping Address", {
            "fields": (
                "address",
                "city",
                "postal_code",
                "country",
            )
        }),
        ("Order Summary", {
            "fields": (
                "subtotal",
                "shipping_fee",
                "total_amount",
                "status",
                "created_at",
            )
        }),
    )


@admin.register(OrderItem)
class OrderItemAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "order",
        "product_name",
        "product_price",
        "quantity",
        "line_total",
    )
    search_fields = ("product_name",)
    ordering = ("-id",)