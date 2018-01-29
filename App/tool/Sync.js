import storage from './Storage';
export default  sync = {
	user : (params) => {
		params.key = 'user';
		params.id = '1001';
		params.data = {
			age : 20,
			name:'熊大'
		};
		storage.save({
			key: params.key,
			id : params.id,
			data: params.data
		});
	},
	picker : (params) => {
		params.key = 'picker';
		params.id = '2222';
		params.data = {
			thumbs:[]
		};

		storage.save({
			key: params.key,
			id : params.id,
			data: params.data
		})
	}
};