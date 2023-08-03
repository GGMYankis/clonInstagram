const Publication = require("../models/publication");
const User = require("../models/user");
const Follow = require("../models/follow");
const awsUploadImage = require("../utils/aws-upload-image");
const { v4: uuidv4 } = require("uuid");

async function publish(file, ctx) {
  const { id } = ctx.user;
  const { createReadStream, mimetype } = await file;

  const extension = mimetype.split("/")[1];

  const fileName = `publication/${uuidv4()}.${extension}`;
  const fileData = createReadStream();

  try {
    const result = await awsUploadImage(fileData, fileName);
    const publication = new Publication({
      idUser: id,
      file: result,
      typeFile: mimetype.split("/")[0],
      createAt: Date.now(),
    });
    publication.save();
    return {
      status: true,
      urlFile: result,
    };
  } catch (error) {
    return {
      status: null,
      urlFile: "",
    };
  }
}

async function getPublications(username) {
  try {
    const user = await User.findOne({ username });

    if (!user) throw new Error("Usuario no encontrado");

    const publication = await Publication.find()
      .where({ idUser: user._id })
      .sort({ createAt: -1 });

    return publication;
  } catch (error) {
    return null;
  }
}

async function getPublicationFolloweds(ctx) {
  const followeds = await Follow.find({ idUser: ctx.user.id }).populate(
    "follow"
  );

  const followedList = [];

  for await (const data of followeds) {
    followedList.push(data.follow);
  }

  const publicationList = [];

  for await (const data of followedList) {
    const publications = await Publication.find()
      .where({
        idUser: data._id,
      })
      .sort({ createAt: -1 })
      .populate("idUser")
      .limit(10);

    publicationList.push(...publications);
  }

  return publicationList;
}

module.exports = {
  publish,
  getPublications,
  getPublicationFolloweds,
};
