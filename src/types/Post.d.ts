interface Post {
    title: string;
    content: string | string[];
    uid: string;
}

interface PostWIthId extends Post {
    _id: string;
}