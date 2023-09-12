export default {
	properties: [
		{
			text: 'Nombre',
			key: 'name',
			type: 'text',
			value: '',
			is_title: true,
		},
		{
			text: 'Direccion',
			key: 'address',
			type: 'text',
			value: '',
			show: true,
		},
		{
			text: 'Observaciones',
			key: 'observations',
			type: 'text',
			value: '',
			show: true,
		},
		{
			text: 'Cliente',
			key: 'client_id',
			type: 'select',
			value: 0,
			show: true,
		},
	],
}