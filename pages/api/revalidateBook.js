export default async function handler(req, res) {
  console.log("Next.js is revalidating bookinfo...");
  let revalidated = false;
  try {
    await res.unstable_revalidate(`/${req.query.id}`);
    revalidated = true;
  } catch (err) {
    console.error(err);
  }
  res.json({ revalidated });
}
