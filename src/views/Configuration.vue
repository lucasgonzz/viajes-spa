<template>
    <b-container fluid>

		<b-row>
			<b-col
			cols="12"
			md="8">
				<general></general>	
				<update-password></update-password>	
			</b-col>
		</b-row>

    </b-container>
</template>
<script>
import General from '@/components/configuration/components/General'
import UpdatePassword from '@/components/configuration/components/UpdatePassword'
export default {
	components: {
		General,
		UpdatePassword,
	}
}
</script>