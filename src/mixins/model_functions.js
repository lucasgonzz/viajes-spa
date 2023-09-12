export default {
	methods: {
		getFunctionValue(prop, model) {
			return this[prop.function](model)
		},
		getOrderTotal(model) {
			let total = 0
			if (model.order_type_id == 1) {
				model.packages.forEach(_package => {
					if (_package.pivot.amount) {
						total += Number(_package.pivot.price) * Number(_package.pivot.amount)
					}
				})
			} else if (model.order_type_id == 2) {
				total += model.money_price
			} else if (model.order_type_id == 3) {
				total += model.person_price * model.person_amount
			}
			return this.price(total)
		}
	}
}