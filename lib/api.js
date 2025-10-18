export async function apiFetch(endpoint , options){
  const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/v1` || 'http://localhost:8000/api/v1';
  const res = fetch(`${baseUrl}/${endpoint}`, {
    headers:{
        'Content-Type': 'application/json',
    },
    cache:'no-store',
    ...options
  });
  if (!res.ok) {
    throw new Error(`API Error: ${res.status} ${res.statusText}`);
  }
  return res.json();
}