<template>
    <v-container class="pa-0 pt-2" fluid id="main">
        <v-row>
            <v-col cols="12">
                <v-card class="rounded-lg" flat width="870" color="grey-lighten-1" height="217.5">
                 
                </v-card>
            </v-col>
            <v-col cols="2">
                <div class="pa-5 pt-10 pl-7 d-flex flex-column" style="position: relative">
                    <v-card class="bg-grey-lighten-1 rounded-circle" height="160" width="160" style="margin-top: -135px;border: 4px solid #d1d0d0">
                    </v-card>
                </div>
            </v-col>
            <v-col cols="10" class="pl-15 pt-8 mt-n8">
                <v-card class="rounded-lg pl-3" color="transparent" flat>
                    <h2 class="font-weight-medium align-center text-capitalize  d-flex">
                        <v-card width="150" color="grey-lighten-1 mb-4" height="30" flat></v-card>
                        <v-spacer></v-spacer>
                        <v-card width="100" color="grey-lighten-1 mb-4 ml-4" height="20" flat></v-card>
                        <v-card width="100" color="grey-lighten-1 mb-4 ml-4" height="20" flat></v-card>
                    </h2>
                    <h5 class="text-primary font-weight-medium">
                        <v-card width="250" color="grey-lighten-1 mt-n2 mb-2" height="20" flat></v-card>
                    </h5>
                    <div class="my-5 d-flex">
                        <v-card width="120" color="grey-lighten-1 mb-4 mr-5" height="35" flat></v-card>
                        <v-card width="120" color="grey-lighten-1 mb-4" height="35" flat></v-card>
                    </div>
                </v-card>
            </v-col>
        </v-row>
        <div class="px-0 pt-2 d-flex">
            <v-card width="120" color="grey-lighten-1 mb-4 mr-2" height="30" flat></v-card>
            <v-card width="120" color="grey-lighten-1 mb-4 mr-2" height="30" flat></v-card>
            <v-card width="120" color="grey-lighten-1 mb-4 mr-2" height="30" flat></v-card>
            <v-card width="120" color="grey-lighten-1 mb-4 mr-2" height="30" flat></v-card>
        </div>
        <v-divider></v-divider>
    </v-container>
</template>

<style scoped>
#main {
    animation: blinking 3s linear infinite;
}

@keyframes blinking {
	0% {
		opacity: 1;
	}

	50% {
		opacity: 0.2;
	}

	100% {
		opacity: 1;
	}
}
</style>