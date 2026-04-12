from rest_framework import status, permissions
from rest_framework.generics import RetrieveAPIView, ListAPIView
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Order
from .serializers import CheckoutSerializer, OrderReadSerializer


class CheckoutAPIView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = CheckoutSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user = request.user if request.user.is_authenticated else None
        order = serializer.save(user=user)

        return Response(
            {
                "message": "Order placed successfully",
                "order": OrderReadSerializer(order).data,
            },
            status=status.HTTP_201_CREATED,
        )


class MyOrderListAPIView(ListAPIView):
    serializer_class = OrderReadSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Order.objects.filter(user=self.request.user).order_by("-created_at")


class MyOrderDetailAPIView(RetrieveAPIView):
    serializer_class = OrderReadSerializer
    permission_classes = [permissions.IsAuthenticated]
    lookup_field = "id"

    def get_queryset(self):
        return Order.objects.filter(user=self.request.user)