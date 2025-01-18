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
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}
