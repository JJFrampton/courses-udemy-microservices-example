import React, { useState } from 'react';
import axios from 'axios';
import configs from './config';
const config = configs.custom;

let CommentCreate = ({ postId }) => {
	const [content, setContent] = useState('');

	const onSubmit = async (event) => {
		event.preventDefault();
		console.log("postId : " + postId);
		console.log("content : " + content);

		await axios.post(`${config.external.commentService}/posts/${postId}/comments`, {
			content
		});

		setContent('');
	};

	return (
		<div>
			<form onSubmit={onSubmit}>
				<div className="form-group">
					<label>New Comment</label>
					<input
						value={content}
						onChange={ e => setContent(e.target.value) }
						className="form-control" />
				</div>
				<button className="btn btn-primary">Submit</button>
			</form>
		</div>
	);
}
export default CommentCreate;