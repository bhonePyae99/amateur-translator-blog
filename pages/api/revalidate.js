export default async function handler(req, res) {
  let revalidateRoute = "";
  if (req.query.route === "home") {
    revalidateRoute = "/";
  } else if (req.query.route === "book") {
    revalidateRoute = `/${req.query.id}`;
  } else if (req.query.route === "chapters") {
    revalidateRoute = `/${req.query.id}/chapters`;
  }
  console.log(revalidateRoute);
  let revalidated = false;
  try {
    await res.unstable_revalidate(revalidateRoute);
    revalidated = true;
  } catch (err) {
    console.error(err);
  }
  res.json({ revalidated });
}
