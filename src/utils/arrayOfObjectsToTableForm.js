import moment from 'moment';

export const arrayOfObjectsToTableForm = async (data, fields) => {
	let rows = [];
	var ISO_8601 = /^\d{4}(-\d\d(-\d\d(T\d\d:\d\d(:\d\d)?(\.\d+)?(([+-]\d\d:\d\d)|Z)?)?)?)?$/i;

	data.forEach((element) => {
		let row = [];
		fields.forEach((field) => {
			console.log('element[field.field]',field.field,'=', element[field.field])
			if (element[field.field] || element[field.field] === 0 || element[field.field] === false) {
				console.log('entro..')
				if (Array.isArray(element[field.field]) && field.viewFormat === 'count') {
					row.push(element[field.field].length);
				} else {		
					console.log('not an array')		
					if (ISO_8601.test(element[field.field]) && field.viewFormat) {					
						row.push(moment(element[field.field]).format(field.viewFormat));
					} else {
						console.log('pushing value...')
						row.push(element[field.field]);
					}
				}
			} else {
				
				row.push('');
			}
		});

		rows.push(row);
	});
	return rows;
};
