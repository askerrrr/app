var getFileData = async (url) => {
  var response = await fetch(url);

  if (!response.ok) {
    var err = await response.text();
    console.log(err);
    return;
  }

  return response.body;
};

export default getFileData;
