import Storage from './Storage';
export default  sync = {
	user : (params) => {
		params.key = 'user';
		params.id = '1001';
		params.data = {
			age : 20,
			name:'熊大'
		};
		Storage.save({
			key: params.key,
			id : params.id,
			data: params.data
		});
	},
	ImagePicekr : (params) => {
		params.key = 'ImagePicekr';
		params.id = '2222';
		params.data = {
			thumbs:[]
		};

		Storage.save({
			key: params.key,
			id : params.id,
			data: params.data
		})
	}
};