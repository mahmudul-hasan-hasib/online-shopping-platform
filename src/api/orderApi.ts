const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const ORDER_BASE_URL = `${API_BASE_URL}/api/orders`;

export async function getMyOrders(accessToken: string) {
  const response = await fetch(`${ORDER_BASE_URL}/my-orders/`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw data;
  }

  return data;
}
export async function placeOrder(
  payload: Record<string, unknown>,
  accessToken?: string
) {
  const response = await fetch(`${ORDER_BASE_URL}/checkout/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok) {
    throw data;
  }

  return data;
}
export async function getMyOrderById(id: number | string, accessToken: string) {
  const response = await fetch(`${ORDER_BASE_URL}/my-orders/${id}/`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw data;
  }

  return data;
}