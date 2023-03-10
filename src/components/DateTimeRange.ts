import { Vue, Component, Prop, Watch } from 'vue-property-decorator';

@Component({
  name: 'DateTimeRange',
  components: {},
})
export default class DateTimeRange extends Vue {
  @Prop({ type: String, default: '' })
  startPlaceholder; // 开始时间占位内容
  @Prop({ type: String, default: '' })
  endPlaceholder; // 结束时间占位内容
  @Prop({ type: Boolean, default: true })
  clearable;
  @Prop({ type: Boolean, default: false })
  readonly;
  @Prop({ type: Boolean, default: false })
  disabled;
  @Prop({ type: String, default: '' })
  className;
  @Prop()
  value;
  @Prop({ type: String, default: 'yyyy-MM-dd HH:mm:ss' })
  valueFormat;

  // 开始时间
  get startTime() {
    if (this.value) {
      return this.value[0];
    } else {
      return null;
    }
  }

  set startTime(val) {
    if (this.endTime || val) {
      this.$emit('input', [val, this.endTime]);
    } else {
      this.$emit('input', null);
    }
  }

  // 结束时间
  get endTime() {
    if (this.value) {
      return this.value[1];
    } else {
      return null;
    }
  }

  set endTime(val) {
    if (this.startTime || val) {
      this.$emit('input', [this.startTime, val]);
    } else {
      this.$emit('input', null);
    }
  }

  // 开始时间限制
  pickerOptionsStart() {
    let that = this;
    return {
      disabledDate: (time) => {
        if (that.endTime) {
          // 结束当前天0点
          const endDayTime = new Date(that.endTime).setHours(0, 0, 0, 0);
          return time.getTime() > endDayTime;
        }
      },
    };
  }

  // 结束时间限制
  pickerOptionsEnd() {
    let that = this;
    return {
      disabledDate: (time) => {
        if (that.startTime) {
          // 开始当前天0点
          let startDay = new Date(that.startTime).setHours(0, 0, 0, 0);
          return time.getTime() < startDay;
        }
      },
    };
  }

  // 开始时间变化
  startTimeChange(val) {
    if (this.endTime && val) {
      if (new Date(val) > new Date(this.endTime)) {
        this.endTime = val;
      }
    }
  }

  // 结束时间变化
  endTimeChange(val) {
    if (this.startTime && val) {
      if (new Date(val) < new Date(this.startTime)) {
        this.startTime = val;
      }
    }
  }
}
