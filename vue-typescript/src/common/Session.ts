import LibraryUser from '../entity/LibraryUser';

export default class Session {
    public static KEY: string = "session";

    public static set(user: LibraryUser) {
        if (user == null) {
            window.sessionStorage.removeItem(Session.KEY);
        } else {
            window.sessionStorage.setItem(Session.KEY, JSON.stringify(user));
        }
    }

    public static get(key?: keyof LibraryUser) {
        const session: string | null = window.sessionStorage.getItem(Session.KEY);

        if(session) {
            if (key) {
                const user: LibraryUser = LibraryUser.InstanceFrom(JSON.parse(session));

                return user.hasOwnProperty(key) ? user[key] : null;
            }

            return LibraryUser.InstanceFrom(JSON.parse(session));
        }

        return null;
    }

    public static isLogin() {
        const user: LibraryUser = Session.get();

        return user instanceof LibraryUser && user.id > 0 && user.token.length > 10;
    }

}