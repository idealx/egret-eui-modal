# egret-eui-modal

基于 Egret EUI 实现了类似微信小程序 wx.showModal 和 wx.showToast API 的效果，方便各位在快速开发原型时使用。

## 使用指南

Egret安装与部署参见[官方文档](http://developer.egret.com/cn/github/egret-docs/Engine2D/projectConfig/installation/index.html)，安装完成后使用 Egret Wing 打开项目运行即可查看效果。

### 集成到已有的项目

拷贝以下文件到已有项目：
```
src/components/ConfirmModal.ts
src/components/Toast.ts
resource/components/ConfirmModal.exml
```

### 代码示例

```
let modal = new ConfirmModal({
    title: '提示',
    content: '这是一个模态弹窗',
    success: confirm => {
        if (confirm) {
            console.log('用户点击确定');
        } else {
            console.log('用户点击取消');
        }
    }
});
modal.showOnStage(stage);
```

```
let delay = 1500;
let toast = new Toast({
    text: `这是个Toast，${delay}ms后消失`,
    delay: delay,
    success: () => {
        console.log('Toast消失了');
    }
});
toast.showOnStage(stage);
```

更多参见 Main.ts 以及以上文件的相关源码。