class Post {
    constructor (
        id,
        groupName,
        groupType,
        author,
        createdAt,
        content,
        image,
        likes,
        comments
    ) {
        this.id = id;
        this.groupName = groupName;
        this.groupType = groupType;
        this.author = author;
        this.createdAt = createdAt;
        this.content = content;
        this.image = image;
        this.likes = likes;
        this.comments = comments;
    }
}

export default Post;