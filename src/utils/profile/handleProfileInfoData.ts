export async function getProfileInfoData(
  handle: any,
  session: any,
  authorization: any,
  uuid: any
) {
  if (session) {
    // 로그인 된 상태
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/member-service/api/v1/non-authorization/users/profile/${handle}`,
      {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${authorization}`,
          uuid: `${uuid}`,
        },
      }
    );

    const data = await res.json();
    return data;
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/member-service/api/v1/non-authorization/users/profile/${handle}`
  );

  const data = await res.json();
  return data;
}
