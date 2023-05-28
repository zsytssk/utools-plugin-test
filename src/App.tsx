import { Button } from 'antd';

export default function App() {
    const onclick = async () => {
        // utools.showOpenDialog({
        //     filters: [{ name: 'plugin.json', extensions: ['json'] }],
        //     properties: ['openFile'],
        // });
        // // utools.findInPage('utools');
        // utools.showNotification('Hi, uTools');
        // utools.shellOpenPath(
        //     '/Users/zsy/Documents/zsy/test/utools-plugin/dist',
        // );
        // utools.shellBeep();
        const result = await (window as any).test();
        console.log(`test:>fs`, result);
    };

    return (
        <div>
            <Button onClick={onclick}>click</Button>
        </div>
    );
}
