export default async (message) => {
    const postResponse = await fetch(`http://${process.env.POSTS_HOST}/api/${message.post_id}`);
    if (!postResponse.ok) {
        throw new Error(`Request to posts finished with status ${userResponse.status}`);
    }
    const post = await postResponse.json();
    const userResponse = await fetch(`http://${process.env.USERS_HOST}/api/${post.author_id}`);
    if (!userResponse.ok) {
        throw new Error(`Request to users finished with status ${userResponse.status}`);
    }
    const receiver = await userResponse.json();
    return {
        from: `"Some Blog" <${process.env.EMAIL}>`,
        to: receiver.email,
        subject: `New comments on post "${post.header}"`,
        text: textEmail(message, post, receiver),
        html: htmlEmail(message, post, receiver)
    }
}


const textEmail = (message, post, receiver) => {
    return `Hello, ${receiver.username}! Your publication "${post.header}" got one new comment: ${message}`
}

const htmlEmail = (message, post, receiver) => {
    return `<html lang="en">
            <h1>Hello , ${receiver.username}!</h1>
            <p>
                Your publication "${post.header}" got one new comment:
                <span>
                    ${message}
                </span> 
            </p>
            </html>`
}
