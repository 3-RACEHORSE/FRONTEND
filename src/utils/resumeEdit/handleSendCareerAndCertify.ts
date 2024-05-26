export const sendCareer = async (
  authorization: string,
  uuid: string,
  career1: string,
  career2: string,
  career3: string
) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/member-service/api/v1/authorization/users/career`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${authorization}`,
          uuid: `${uuid}`,
        },
        body: JSON.stringify({
          job: career1,
          year: career2,
          month: career3,
        }),
      }
    );
    console.log(res.status);
  } catch (error) {
    console.error("Error:", error);
  }
};

export const sendCertify = async (
  authorization: string,
  uuid: string,
  certify1: string,
  certify2: string,
  certify3: string
) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/member-service/api/v1/authorization/users/qualification`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${authorization}`,
          uuid: `${uuid}`,
        },
        body: JSON.stringify({
          name: certify1,
          issueDate: certify3,
          agency: certify2,
        }),
      }
    );
    console.log(res.status);
  } catch (error) {
    console.error("Error:", error);
  }
};
