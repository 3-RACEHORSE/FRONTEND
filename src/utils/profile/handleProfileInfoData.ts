export async function getProfileInfoData(handle: any) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/member-service/api/v1/non-authorization/users/profile/${handle}`
  );

  const data = await res.json();
  return data;
}
