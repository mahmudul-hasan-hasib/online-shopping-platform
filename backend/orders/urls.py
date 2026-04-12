from django.urls import path
from .views import CheckoutAPIView, MyOrderListAPIView, MyOrderDetailAPIView

urlpatterns = [
    path("checkout/", CheckoutAPIView.as_view(), name="checkout"),
    path("my-orders/", MyOrderListAPIView.as_view(), name="my-orders"),
    path("my-orders/<int:id>/", MyOrderDetailAPIView.as_view(), name="my-order-detail"),
]