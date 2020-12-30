import React, { useState } from 'react';
import axios from 'axios';
import configs from './config';
const config = configs.custom;

let PostCreate = () => {
	const [title, setTitle] = useState('');
	const onSubmit = async (event) => {
		event.preventDefault();

		console.log(config);
		console.log(config['external']['postService']);
		await axios.post(config.external.postService + '/posts/', {
			title
		}).catch((e) => {console.log(e)});

		setTitle('');
	}
	return (
		<div>
			<form onSubmit={onSubmit}>
				<div className="form-group">
					<label>Title</label>
					<input
						value={title} 
						onChange={e => setTitle(e.target.value)} 
						className="form-control" />
				</div>
				<button className="btn btn-primary">Submit</button>
			</form>
		</div>
	)
}
export default PostCreate;