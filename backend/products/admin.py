from django.contrib import admin
from .models import Product


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "name",
        "category",
        "price",
        "stock",
        "rating",
        "reviews",
        "is_featured",
        "created_at",
    )
    list_filter = ("category", "is_featured", "created_at")
    search_fields = ("name", "description", "category")
    prepopulated_fields = {"slug": ("name",)}
    list_editable = ("price", "stock", "is_featured")
    ordering = ("-created_at",)
    readonly_fields = ("created_at",)

    fieldsets = (
        ("Basic Information", {
            "fields": ("name", "slug", "description", "category")
        }),
        ("Pricing & Inventory", {
            "fields": ("price", "stock")
        }),
        ("Media & Ratings", {
            "fields": ("image", "rating", "reviews")
        }),
        ("Status", {
            "fields": ("is_featured", "created_at")
        }),
    )