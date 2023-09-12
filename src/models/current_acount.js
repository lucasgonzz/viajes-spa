export default {
	properties: [
		{
			text: 'Fecha',
			key: 'created_at',
			type: 'date',
			value: '',
			show: true,
		},
		{
			text: 'Pedido N°',
			key: 'order.id',
			type: 'text',
			value: '',
			is_title: true,
			title_prefix: 'Ped N°'
		},
		{
			text: 'Recibo N°',
			key: 'num_receipt',
			type: 'text',
			value: '',
			is_title: true,
			title_prefix: 'Rec N°'
		},
		{
			text: 'Debe',
			key: 'debe',
			type: 'integer',
			value: '',
			show: true,
		},
		{
			text: 'Haber',
			key: 'haber',
			type: 'integer',
			value: '',
			show: true,
		},
		{
			text: 'Saldo',
			key: 'saldo',
			type: 'integer',
			value: '',
			show: true,
		},
		{
			text: 'Met de pago',
			key: 'current_acount_payment_method.name',
			type: 'text',
			value: '',
			show: true,
		},
		{
			text: 'Descripcion',
			key: 'description',
			type: 'text',
			value: '',
			show: true,
		},
	],
}