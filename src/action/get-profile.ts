"use server";

export async function getUserDetails(roll: string) {
  const url = `${process.env.BACKED_URL}/search?roll=${roll}`;
  console.log(url);

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "X-API-Key": process.env.BACKED_API_KEY!,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}
