// Toast 选项
interface ToastOptions {
    text: string;
    delay?: number;
    success?: () => void;
}

class Toast extends eui.Rect {
    label = new eui.Label();

    private showStage: egret.DisplayObjectContainer;
    options: ToastOptions;

    public constructor(obj?: ToastOptions) {
		super();
        this.options = obj;

		// 监听组件创建完毕 也就是场景的外观创建完毕
		this.addEventListener(eui.UIEvent.CREATION_COMPLETE, this.onComplete, this);
        this.addEventListener(eui.UIEvent.RESIZE, this.labelResized, this);
	}
    
    set toastText(text: string) {
        this.label.text = text;
    }
    get delay() {
        return this.options.delay || 2000;
    }

    protected onComplete() {
        this.fillColor = 0x000000;
        this.fillAlpha = 0.6;
        this.horizontalCenter = 0;
        this.verticalCenter = 0;
        this.ellipseWidth = 30;
        this.ellipseHeight = 30;

        this.label.x = 20;
        this.label.y = 20;
        this.label.size = 28;
        this.addChild(this.label);

        this.toastText = this.options.text || '';
    }
    protected labelResized() {
        this.width = this.label.width + 40;
        this.height = this.label.height + 40;
    }

    // 显示弹框
    public showOnStage(stage: egret.DisplayObjectContainer) {
        this.label.maxWidth = stage.width * 0.6;

        this.showStage = stage;
        this.alpha = 0;
        stage.addChild(this);
        let tw = egret.Tween.get(this);
        tw.to({'alpha': 1}, 300).wait(this.delay).call(this.hide, this);
    }

    public hide() {
        let tw = egret.Tween.get(this);
        tw.to({'alpha': 0}, 300).call(() => {
            this.showStage.removeChild(this);
            typeof this.options.success == "function" && this.options.success();
        });
    }
}