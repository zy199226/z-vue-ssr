import { app, router, store } from '../src/ssr.entry';

export default context => new Promise((resolve, reject) => {
    router.push(context.url);

    router.onReady(() => {
        const matchedComponents = router.getMatchedComponents();

        if (!matchedComponents.length) {
            return reject({ code: 404 });
        }

        Promise.all(matchedComponents.map((Component) => {
            if (Component.asyncData) {
                return Component.asyncData({
                    store,
                    route: router.currentRoute
                });
            }
        })).then(() => {
            context.state = store.state;

            resolve(app);
        }).catch(reject);
    }, reject);
});
