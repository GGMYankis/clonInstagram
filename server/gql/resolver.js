const userController = require("../controller/user");
const followController = require("../controller/follow");
const publicacionController = require("../controller/publication");
const commentController = require("../controller/comment");
const likeController = require("../controller/like");
const like = require("../models/like");

const resolvers = {
  Query: {
    getUser: (_, { id, username }) => userController.getUser(id, username),
    search: (_, { search }) => userController.search(search),

    //Follow
    isFollow: (_, { username }, ctx) =>
      followController.isFollow(username, ctx),

    getFollowers: (_, { username }) => followController.getFollowers(username),
    getFolloweds: (_, { username }) => followController.getFolloweds(username),
    getPublications: (_, { username }) =>
      publicacionController.getPublications(username),

    //  Comment
    getComments: (_, { idPublication }) =>
      commentController.getComments(idPublication),

    // lik e

    isLike: (_, { idPublication }, ctx) =>
      likeController.isLike(idPublication, ctx),
    countLikes: (_, { idPublication }) =>
      likeController.countLikes(idPublication),

    getPublicationFolloweds: (_, {}, ctx) =>
      publicacionController.getPublicationFolloweds(ctx),
    getNotFolloweds: (_, {}, ctx) => followController.getNotFolloweds(ctx),
  },

  Mutation: {
    register: (_, { input }) => userController.register(input),
    login: (_, { input }) => userController.login(input),
    updateAvatar: (_, { file }, ctx) => userController.updateAvatar(file, ctx),
    deleteAvatar: (_, {}, ctx) => userController.deleteAvatar(ctx),
    updateUser: (_, { input }, ctx) => userController.updateUser(input, ctx),

    //follow
    follow: (_, { username }, ctx) => followController.follow(username, ctx),
    unFollow: (_, { username }, ctx) =>
      followController.unFollow(username, ctx),

    //publicacion
    publish: (_, { file }, ctx) => publicacionController.publish(file, ctx),

    //Comment

    addComment: (_, { input }, ctx) => commentController.addComment(input, ctx),

    // Like
    addLike: (_, { idPublication }, ctx) =>
      likeController.addLike(idPublication, ctx),
    deleteLike: (_, { idPublication }, ctx) =>
      likeController.deleteLike(idPublication, ctx),
  },
};

module.exports = resolvers;
