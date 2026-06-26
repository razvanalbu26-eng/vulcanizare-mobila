import { SITE } from "../../../lib/config.js";

export async function GET() {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    return Response.json({
      ...SITE.reviews,
      source: "fallback_no_api_key",
    });
  }

  const searchQuery =
    "Vulcanizare Mobila Camioane si Autoturisme Non Stop Buzau";

  try {
    const searchRes = await fetch(
      "https://places.googleapis.com/v1/places:searchText",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Goog-Api-Key": apiKey,
          "X-Goog-FieldMask":
            "places.id,places.displayName,places.formattedAddress",
        },
        body: JSON.stringify({
          textQuery: searchQuery,
          languageCode: "ro",
          regionCode: "RO",
        }),
        next: { revalidate: 86400 },
      }
    );

    const searchData = await searchRes.json();

    if (!searchRes.ok || !searchData?.places?.length) {
      return Response.json({
        ...SITE.reviews,
        source: "fallback_search_failed",
        googleStatus: searchRes.status,
        debug: searchData,
      });
    }

    const placeId = searchData.places[0].id;

    const detailsRes = await fetch(
      `https://places.googleapis.com/v1/places/${placeId}?languageCode=ro&regionCode=RO`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-Goog-Api-Key": apiKey,
          "X-Goog-FieldMask":
            "id,displayName,rating,userRatingCount,reviews,googleMapsUri",
        },
        next: { revalidate: 86400 },
      }
    );

    const place = await detailsRes.json();

    if (!detailsRes.ok) {
      return Response.json({
        ...SITE.reviews,
        source: "fallback_details_failed",
        googleStatus: detailsRes.status,
        debug: place,
      });
    }

    const reviews =
      place?.reviews?.map((rev) => ({
        name: rev?.authorAttribution?.displayName || "Client Google",
        where: "Google",
        stars: rev?.rating ?? 5,
        text:
          rev?.originalText?.text ||
          rev?.text?.text ||
          "Clientul a lăsat rating fără comentariu.",
        date:
          rev?.relativePublishTimeDescription ||
          "Recenzie Google",
      })) || [];

    return Response.json({
      rating: place?.rating ?? SITE.reviews.rating,
      countText: place?.userRatingCount
        ? `${place.userRatingCount} recenzii Google`
        : SITE.reviews.countText,
      googleUrl: place?.googleMapsUri ?? SITE.reviews.googleUrl,
      items: reviews.length ? reviews : SITE.reviews.items,
      source: "google_places_api_new",
    });
  } catch (error) {
    return Response.json({
      ...SITE.reviews,
      source: "fallback_error",
      error: error?.message,
    });
  }
}