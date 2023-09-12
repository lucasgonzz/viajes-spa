export default {
	properties: [
		{
			text: 'Nombre',
			key: 'name',
			type: 'text',
			value: '',
			is_title: true,
			required: true,
		},
		{
			text: 'Bultos',
			key: 'packages',
			belongs_to_many: {
				model_name: 'package',
				related_with_all: true,
				properties_to_set: [
					{
						text: 'Precio',
						key: 'price',
						type: 'number'
					}
				],
			}
		},
		{
			text: 'Precio por persona',
			key: 'person_price',
			type: 'number',
			value: '',
			show: true,
		},
		{
			text: 'Precio por plata',
			key: 'money_price',
			type: 'number',
			value: '',
			show: true,
		},
	],
}