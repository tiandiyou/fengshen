export class GameFlowManager {
    private currentChapter: number = 1;
    private chapterProgress: Map<number, Set<string>> = new Map();

    constructor() {
        this.chapterProgress.set(1, new Set());
    }

    getCurrentChapter(): number {
        return this.currentChapter;
    }

    completeObjective(objectiveId: string) {
        const progress = this.chapterProgress.get(this.currentChapter);
        if (progress) {
            progress.add(objectiveId);
        }
    }

    isObjectiveComplete(objectiveId: string): boolean {
        const progress = this.chapterProgress.get(this.currentChapter);
        return progress ? progress.has(objectiveId) : false;
    }

    canProgressToNextChapter(): boolean {
        switch (this.currentChapter) {
            case 1:
                return this.isObjectiveComplete('defeat_east_sea_dragon_king');
            case 2:
                return this.isObjectiveComplete('defeat_tenth_king');
            default:
                return false;
        }
    }

    progressToNextChapter(): boolean {
        if (!this.canProgressToNextChapter()) return false;

        this.currentChapter++;
        this.chapterProgress.set(this.currentChapter, new Set());
        return true;
    }

    getChapterObjectives(): string[] {
        switch (this.currentChapter) {
            case 1:
                return [
                    'defeat_south_sea_dragon_king',
                    'defeat_west_sea_dragon_king',
                    'defeat_north_sea_dragon_king',
                    'obtain_ding_hai_zhu',
                    'defeat_xiao_long_nv',
                    'defeat_east_sea_dragon_king',
                ];
            case 2:
                return [
                    'defeat_qin_guang_wang',
                    'defeat_chu_jiang_wang',
                    'defeat_song_di_wang',
                    'defeat_wu_guan_wang',
                    'defeat_sen_luo_wang',
                    'defeat_bian_cheng_wang',
                    'defeat_tai_shan_wang',
                    'defeat_du_shi_wang',
                    'defeat_ping_deng_wang',
                    'obtain_ding_shen_zhu',
                    'defeat_zhuan_lun_wang',
                ];
            default:
                return [];
        }
    }
}
