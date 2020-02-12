class ConfirmModal extends eui.Component {
    private maskBg: eui.Rect;
    private modalGroup: eui.Group;
    titleLabel: eui.Label;
    contentLabel: eui.Label;
    btnGroup: eui.Group;
    confirmBtn: eui.Label;
    cancelBtn: eui.Label;

    showStage: egret.DisplayObjectContainer;
    options: any;
    success?: (confirm: boolean) => void;

    public constructor(obj?: any) {
		super();
        this.skinName = 'resource/components/ConfirmModal.exml';
        this.options = obj;

		// 监听组件创建完毕 也就是场景的外观创建完毕
		this.addEventListener(eui.UIEvent.CREATION_COMPLETE, this.onComplete, this);
		this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddedToStage, this);
	}

    set title(title: string) {              // 弹框标题
        this.titleLabel.text = title;
    }
    set content(content: string) {         // 弹框内容
        this.contentLabel.text = content;
    }
    set showCancel(show: boolean) {
        if (show) {
            this.cancelBtn.visible = true;
        } else {
            this.cancelBtn.visible = false;
            this.cancelBtn.percentWidth = 0;
            this.confirmBtn.percentWidth = 100;
        }
        // 分割线
        let shp = new egret.Shape();
        shp.height = 80;
        shp.x = 0; shp.y = this.modalGroup.height - shp.height; shp.width = this.modalGroup.width; 
        shp.graphics.lineStyle(1, 0xeeeeee);
        shp.graphics.moveTo(0, 0);
        shp.graphics.lineTo(shp.width, 0);
        if (show) {
            shp.graphics.moveTo(shp.width / 2, 0);
            shp.graphics.lineTo(shp.width / 2, shp.height);
        }
        shp.graphics.endFill();
        this.modalGroup.addChild(shp);
    }
    set confirmButtonText(text: string) {
        this.confirmBtn.text = text;
    }
    set cancelButtonText(text: string) {
        this.cancelBtn.text = text;
    }

    protected onComplete() {
        this.cancelBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.cancelButtonTapped, this);
        this.confirmBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.confirmButtonTapped, this);

        this.title = this.options.title || '';
        this.content = this.options.content || '';
        this.showCancel = this.options.showCancel == undefined ? true: this.options.showCancel;
        this.confirmButtonText = this.options.confirmText || '确定';
        this.cancelButtonText = this.options.cancelText || '取消';
        this.success = this.options.success;
    }

	protected onAddedToStage() {
		this.width = this.stage.stageWidth;
		this.height = this.stage.stageHeight;
	}

    cancelButtonTapped() {
        typeof this.success == "function" && this.success(false);
        this.closeModal();
    }
    confirmButtonTapped() {
        typeof this.success == "function" && this.success(true);
        this.closeModal();
    }

    // 显示弹框
    public showOnStage(stage: egret.DisplayObjectContainer) {
        this.showStage = stage;
        this.alpha = 0;
        stage.addChild(this);
        let tw = egret.Tween.get(this);
        tw.to({'alpha': 1}, 300);
    }

    // 关闭弹框
    public closeModal() {
        let tw = egret.Tween.get(this);
        tw.to({'alpha': 0}, 300).call(() => {
            this.showStage.removeChild(this);
        });
    }
}