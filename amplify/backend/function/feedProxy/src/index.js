exports.handler = async () => {
  const res = await fetch("https://louisdeneve.substack.com/feed.xml");
  const text = await res.text();

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/xml",
      "Access-Control-Allow-Origin": "*"
    },
    body: text
  };
};