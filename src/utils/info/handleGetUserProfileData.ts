export default async function getUserPofileData(authorization: any, uuid: any) {
  -console.log(authorization, uuid);
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/member-service/api/v1/authorization/users/myprofile`,
    {
      headers: {
        authorization: `Bearer ${authorization}`,
        uuid: `${uuid}`,
      },
    }
  );
  if (!res.ok) {
    throw new Error("Network Error");
  }
  const data = await res.json();
  return data;
}
