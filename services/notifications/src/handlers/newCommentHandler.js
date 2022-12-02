import fetch from 'node-fetch';

export default async (comment) => {
    const postResponse = await fetch(`http://${process.env.POSTS_HOST}/api/posts/${comment.post_id}`);
    if (!postResponse.ok) {
        throw new Error(`Request to posts finished with status ${postResponse.status}`);
    }
    const post = await postResponse.json();
    const userResponse = await fetch(`http://${process.env.USERS_HOST}/api/users/${post.author_Id}`);
    if (!userResponse.ok) {
        throw new Error(`Request to users finished with status ${userResponse.status}`);
    }
    const receiver = await userResponse.json();
    return {
        from: `"Some Blog" <${process.env.EMAIL}>`,
        to: receiver.email,
        subject: `New comments on post "${post.header}"`,
        text: textEmail(comment, post, receiver),
        html: htmlEmail(comment, post, receiver)
    }
}


const textEmail = (comment, post, receiver) => {
    return `Hello, ${receiver.username}! Your publication "${post.header}" got one new comment: ${comment.body}`
}

const htmlEmail = (comment, post, receiver) => {
    return `<html lang="en">
            <h1>Hello , ${receiver.username}!</h1>
            <p>
                Your publication "${post.header}" got one new comment:
                <span>
                    ${comment.body}
                </span> 
            </p>
            </html>`
}
