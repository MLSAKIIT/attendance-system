"use server";

export async function setAttendance(roll: string) {
  const url = `${process.env.BACKED_API_URL}/attendance?roll=${roll}`;
  console.log(url);

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "X-API-Key": process.env.BACKED_API_KEY!,
      },
    });
    // NOTE: uncomment code to check for types :)
    // const data = await response.json();
    // console.log(data);
    // return data;

    // just checking for 200 status code
    if (!response.ok) {
      return false;
    }
    return true;
  } catch (error) {
    console.error(error);
    return null;
  }
}
