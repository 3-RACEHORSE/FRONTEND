export const deleteAlarm = async (id: any, authorization: any, uuid: any) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/notification-service/api/v1/alarm/delete/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${authorization}`,
          uuid: `${uuid}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    console.log(response.status);
  } catch (error) {
    console.error("Error deleting alarm:", error);
  }
};
