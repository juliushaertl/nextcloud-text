<template>
    <div>
        <textarea v-model="text" @input="updateContent" />
        <h2>Editor</h2>
        <Editor :content="text" ref="editor" type="markdown" @update="updateText" />
    </div>
</template>

<script>
export default {
    name: 'Markdown',
    mounted() {
        console.log(this.$refs.editor)
    },
    data() {
        return {
            text: `# Ismariis distantibus spectat tellure aetas lacteus

## Cingitur denique

Lorem markdownum fonti, Gorgonei vagantem pereat, [toto
utinam](http://monticolae-vulnera.net/unde.aspx), ingemis. Oileos Liber.

## Genetrix longius recentes foedat et victus meum

Consortia et meus harenae, in [focus tacuit
pignora](http://parva.net/fuitedita): nequeat. Ignibus nec nec pallor Serpens
quaerenti nimbi [mox](http://fuit-sub.org/hic-meminisse), nec aevi, vetustis
Lycaoniae Tartara. Feruntur non, his vertere robora.

## Nominis iterum pronumque vetitum tanta

Altis hic erat Aonides lumina attulit, ait est, *ortus oras meaque* nomine imis:
iam portas exanimis recedit. Longe quam? Ulva cum in, unda interdum diramque
mirantur tandemque dixit ora? Atque quoque poenamque a dilecta pectora corpora,
de amorem equos praeside ab.

    var ddrRay = jfs.winsock(antivirusPetaflops);
    if (optical_network + localhost_virtual_soap) {
        controller_memory_memory += commercial + kibibyteCut;
        shift = e;
    } else {
        json.refreshZoneIphone(bitrate);
        commercial_optical = artificialUp;
        ppi = aspAjax;
    }
    var market_margin = 1;
    thermistorDownload *= 5;
    if (output_trackback_del.multiplatform_metafile_meta(unc_cyberbullying,
            swappableActive(baud_microphone_rich))) {
        partition = petaflops_network(compiler, hdd, trollMode +
                bounce_mbr_password);
        megabit_technology.abendCronHacker(snapshot_uri_systray +
                clientEthernet);
    }

## Tela sive altus longam

Et modo urbem posito videri; poplite totis exclamat, instantes luces dumque,
laurus. Raptores tulit erat **mox** in cibi ipsa cedere diremit: et. Me totum
mea vestigia mendacis at lassa huius. **Etiam** tegminis vulnera; accede
foedantem nullaque. Ullus ipsum; ferre frigida sentirent *post*.

## Dat Dianae aenae iacuit pigra

Luce solum rector percensuit sinistrae suis: per tu capillis precatur, meo asper
maduere. Armis verba, filia ausa toto fero, ego tune vaticinos canum frustra me
credi terraque heu aevi etiamnum levant?

- Numquam et iunxit munere
- Ramisque illa
- Si arbore
- Aduncum corpora animam
- Erat silvis

In carcere manifesta Telamone soliti sed, calathosque [nata
saxa](http://suosduabus.net/innec.php) videri, vestem illi moventur illa quod!
Ultime navalibus verba, numerandos dixit, forte et fraterno postquam non
sororibus ramisque si siquis tamen nati *dicta*.`
        }
    },
    methods: {
        updateContent(event) {
            this.$refs.editor.editor.setContent(event.target.value)
        },
        updateText(text) {
            this.text = text
        }
    }
}
</script>
<style>
.editor {
    overflow:scroll;
    height: 400px;
}
</style>