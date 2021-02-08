class Post {
    constructor (
        id,
        groupId,
        author,
        userName,
        userAvatar,
        userStatus,
        createdAt,
        content,
        image,
        likes,
        comments
    ) {
        this.id = id;
        this.groupId = groupId;
        this.author = author;
        this.userName = userName;
        this.userAvatar = userAvatar;
        this.userStatus = userStatus;
        this.createdAt = createdAt;
        this.content = content;
        this.image = image;
        this.likes = likes;
        this.comments = comments;
    }
}

export default Post; 