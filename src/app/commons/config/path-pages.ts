//#region  PATH AUTH
const loginPage = 'login';
const registerPage = 'register';
const recoverPasswordPage = 'recovery';

export const PATHS_AUTH_PAGES = {
	loginPage: {
		withSlash: `/${loginPage}`,
		onlyPath: loginPage
	},
	registerPage: {
		withSlash: `/${registerPage}`,
		onlyPath: registerPage
	},
	recoverPasswordPage: {
		withSlash: `/${recoverPasswordPage}`,
		onlyPath: recoverPasswordPage
	}
};
//#endregion

//#region  PATH BUY
const buyPage = 'buy';

export const PATH_BUY_PAGES = {
	buyPage: {
		withSlash: `/${buyPage}`,
		onlyPath: buyPage
	}
};
//#endregion

//#region  PATH MAINTENANCE
const maintenancePage = 'maintenance';
const maintenanceBuyPage = 'buy';
const maintenanceEventPage = 'event';
const maintenanceGenrePage = 'genre';
const maintenanceReportPage = 'report';

export const PATH_MAINTENANCE_PAGES = {
	withSlash: `/${maintenancePage}`,
	onlyPath: maintenancePage,

	buy: {
		withSlash: `/${maintenancePage}/${maintenanceBuyPage}`,
		onlyPath: maintenanceBuyPage
	},

	events: {
		withSlash: `/${maintenancePage}/${maintenanceEventPage}`,
		onlyPath: maintenanceEventPage
	},
	genres: {
		withSlash: `/${maintenancePage}/${maintenanceGenrePage}`,
		onlyPath: maintenanceGenrePage
	},
	reports: {
		withSlash: `/${maintenancePage}/${maintenanceReportPage}`,
		onlyPath: maintenanceReportPage
	}
};
//#endregion

//#region  PATH MY ACCOUNT
const myAccountPage = 'my-account';
const myAccountChangePasswordPage = 'change-password';
const myAccountMyShoppingPage = 'buy-page';

export const PATH_MY_ACCOUNT_PAGES = {
	withSlash: `/${myAccountPage}`,
	onlyPath: myAccountPage,

	changePassword: {
		withSlash: `/${myAccountPage}/${myAccountChangePasswordPage}`,
		onlyPath: myAccountChangePasswordPage
	},
  myShopping: {
		withSlash: `/${myAccountPage}/${myAccountMyShoppingPage}`,
		onlyPath: myAccountMyShoppingPage
	}
};
//#endregion
