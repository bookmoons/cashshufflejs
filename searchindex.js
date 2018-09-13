Search.setIndex({docnames:["client","client/session","error","index","interface","interface/coin","interface/crypto","interface/discarder","interface/drawer","interface/fetcher","interface/inbox","interface/inchan","interface/inchanbin","interface/logchan","interface/outchan","interface/outchanbin","interface/receiver","interface/signing","module","module/coin/bitcore","module/crypto/bitcore","module/discarder/log","module/drawer/standard","module/fetcher/each","module/inbox/fifo","module/inchan/inchanbin","module/inchanbin/nodestream","module/logchan/console","module/logchan/distribute","module/logchan/file","module/logchan/prefix","module/outchan/outchanbin","module/outchanbin/nodestream","module/receiver/authenticate","module/receiver/objectify","module/receiver/packetify","module/receiver/phase","module/receiver/session","module/receiver/store","module/signing/bitcore","protocol","type"],envversion:52,filenames:["client.rst","client/session.rst","error.rst","index.rst","interface.rst","interface/coin.rst","interface/crypto.rst","interface/discarder.rst","interface/drawer.rst","interface/fetcher.rst","interface/inbox.rst","interface/inchan.rst","interface/inchanbin.rst","interface/logchan.rst","interface/outchan.rst","interface/outchanbin.rst","interface/receiver.rst","interface/signing.rst","module.rst","module/coin/bitcore.rst","module/crypto/bitcore.rst","module/discarder/log.rst","module/drawer/standard.rst","module/fetcher/each.rst","module/inbox/fifo.rst","module/inchan/inchanbin.rst","module/inchanbin/nodestream.rst","module/logchan/console.rst","module/logchan/distribute.rst","module/logchan/file.rst","module/logchan/prefix.rst","module/outchan/outchanbin.rst","module/outchanbin/nodestream.rst","module/receiver/authenticate.rst","module/receiver/objectify.rst","module/receiver/packetify.rst","module/receiver/phase.rst","module/receiver/session.rst","module/receiver/store.rst","module/signing/bitcore.rst","protocol.rst","type.rst"],objects:{"":{Base64:[41,0,1,""],BusyError:[2,1,1,""],CashAddr:[41,0,1,""],CashShuffleError:[2,1,1,""],Crypto:[6,3,1,""],EmptyError:[2,1,1,""],ExhaustionError:[2,1,1,""],FormatError:[2,1,1,""],HexString:[41,0,1,""],InadequateError:[2,1,1,""],MissingFeatureError:[2,1,1,""],MissingValueError:[2,1,1,""],NotImplementedError:[2,1,1,""],TimeoutError:[2,1,1,""],ValueError:[2,1,1,""]},"coin.Coin":{InputIndex:[5,0,1,""],InputSignature:[5,0,1,""],ParticipantAddress:[5,0,1,""],Signature:[5,0,1,""],Transaction:[5,0,1,""],addTransactionSignature:[5,0,1,""],addTransactionSignatures:[5,0,1,""],address:[5,0,1,""],broadcastTransaction:[5,0,1,""],makeUnsignedTransaction:[5,0,1,""],signTransactionInput:[5,0,1,""],signTransactionInputs:[5,0,1,""],sufficientFunds:[5,0,1,""],verifySignature:[5,0,1,""],verifyTransactionSignature:[5,0,1,""]},"discarder.Discarder":{ErrorMessagePair:[7,0,1,""],submit:[7,0,1,""]},"discarder.log":{LogDiscarder:[21,1,1,""]},"drawer.Drawer":{start:[8,0,1,""],stop:[8,0,1,""],watch:[8,2,1,""]},"drawer.standard":{StandardDrawer:[22,1,1,""]},"fetcher.Fetcher":{fetch:[9,0,1,""]},"fetcher.each":{EachFetcher:[23,1,1,""]},"fetcher.each.EachFetcher":{fetch:[23,0,1,""]},"inbox.Inbox":{add:[10,0,1,""],receive:[10,0,1,""],watch:[10,0,1,""]},"inchan.Inchan":{receive:[11,0,1,""]},"inchan.inchanbin":{InchanbinInchan:[25,1,1,""]},"inchan.inchanbin.InchanbinInchan":{receive:[25,0,1,""]},"inchanbin.Inchanbin":{receive:[12,0,1,""]},"inchanbin.nodestream":{NodestreamInchanbin:[26,1,1,""]},"logchan.Logchan":{send:[13,0,1,""]},"logchan.distribute":{DistributeLogchan:[28,1,1,""]},"logchan.file":{FileLogchan:[29,1,1,""]},"logchan.prefix":{PrefixLogchan:[30,1,1,""]},"outchan.Outchan":{send:[14,0,1,""]},"outchan.outchanbin":{OutchanbinOutchan:[31,1,1,""]},"outchanbin.Outchanbin":{send:[15,0,1,""]},"outchanbin.nodestream":{NodestreamOutchanbin:[32,1,1,""]},"receiver.Receiver":{submit:[16,0,1,""]},"receiver.authenticate":{AuthenticateReceiver:[33,1,1,""],AuthenticateReceiverParams:[33,0,1,""]},"receiver.authenticate.AuthenticateReceiver":{submit:[33,0,1,""]},"receiver.objectify":{ObjectifyReceiver:[34,1,1,""]},"receiver.objectify.ObjectifyReceiver":{submit:[34,0,1,""]},"receiver.packetify":{PacketifyReceiver:[35,1,1,""]},"receiver.packetify.PacketifyReceiver":{submit:[35,0,1,""]},"receiver.phase":{PhaseReceiver:[36,1,1,""]},"receiver.phase.PhaseReceiver":{participantInboxes:[36,2,1,""],submit:[36,0,1,""]},"receiver.session":{SessionReceiver:[37,1,1,""]},"receiver.session.SessionReceiver":{phaseReceivers:[37,2,1,""],submit:[37,0,1,""]},"receiver.store":{StoreReceiver:[38,1,1,""]},"receiver.store.StoreReceiver":{submit:[38,0,1,""]},"session.Session":{AnnounceParams:[1,0,1,""],AnnounceReturn:[1,0,1,""],EquivocationCheckParams:[1,0,1,""],GatherAnnounceParams:[1,0,1,""],GatherDigestParams:[1,0,1,""],GatherFinalOutputParams:[1,0,1,""],GatherOutputListParams:[1,0,1,""],GatherSignatureParams:[1,0,1,""],MessageAnnounceParams:[1,0,1,""],MessageDigestParams:[1,0,1,""],MessageFinalOutputParams:[1,0,1,""],MessageOutputListParams:[1,0,1,""],MessageSignatureParams:[1,0,1,""],OutputParams:[1,0,1,""],OutputReturn:[1,0,1,""],RunParams:[1,0,1,""],RunReturn:[1,0,1,""],ShuffleParams:[1,0,1,""],ShuffleReturn:[1,0,1,""],SubmitParams:[1,0,1,""],SubmitReturn:[1,0,1,""],affix:[1,0,1,""],announce:[1,0,1,""],broadcastOutput:[1,0,1,""],checkEquivocation:[1,0,1,""],decryptOutputList:[1,0,1,""],encryptLayered:[1,0,1,""],gatherAnnounce:[1,0,1,""],gatherDigest:[1,0,1,""],gatherFinalOutput:[1,0,1,""],gatherOutputList:[1,0,1,""],gatherSignature:[1,0,1,""],messageAnnounce:[1,0,1,""],messageDigest:[1,0,1,""],messageFinalOutput:[1,0,1,""],messageOutputList:[1,0,1,""],messageSignature:[1,0,1,""],orderParticipants:[1,0,1,""],packageSignedPacket:[1,0,1,""],run:[1,0,1,""],shuffle:[1,0,1,""],sign:[1,0,1,""],submit:[1,0,1,""]},"signing.Signing":{address:[17,0,1,""],exportPrivateKey:[17,0,1,""],exportPublicKey:[17,0,1,""],generateKeyPair:[17,0,1,""],restoreKeyPair:[17,0,1,""],sign:[17,0,1,""]},BusyError:{name:[2,2,1,""]},CashShuffleError:{name:[2,2,1,""]},Crypto:{decrypt:[6,0,1,""],encrypt:[6,0,1,""],exportPrivateKey:[6,0,1,""],exportPublicKey:[6,0,1,""],generateKeyPair:[6,0,1,""],hash:[6,0,1,""],restoreKeyPair:[6,0,1,""]},EmptyError:{name:[2,2,1,""]},ExhaustionError:{name:[2,2,1,""]},FormatError:{name:[2,2,1,""]},InadequateError:{name:[2,2,1,""]},MissingFeatureError:{name:[2,2,1,""]},MissingValueError:{name:[2,2,1,""]},NotImplementedError:{name:[2,2,1,""]},TimeoutError:{name:[2,2,1,""]},ValueError:{name:[2,2,1,""]},coin:{Coin:[5,3,1,""],bitcore:[19,4,1,""]},crypto:{bitcore:[20,4,1,""]},discarder:{Discarder:[7,3,1,""],log:[21,4,1,""]},drawer:{Drawer:[8,3,1,""],standard:[22,4,1,""]},fetcher:{Fetcher:[9,3,1,""],each:[23,4,1,""]},inbox:{Inbox:[10,3,1,""],fifo:[24,4,1,""]},inchan:{Inchan:[11,3,1,""],inchanbin:[25,4,1,""]},inchanbin:{Inchanbin:[12,3,1,""],nodestream:[26,4,1,""]},logchan:{Logchan:[13,3,1,""],console:[27,4,1,""],distribute:[28,4,1,""],file:[29,4,1,""],prefix:[30,4,1,""]},outchan:{Outchan:[14,3,1,""],outchanbin:[31,4,1,""]},outchanbin:{Outchanbin:[15,3,1,""],nodestream:[32,4,1,""]},protocol:{Address:[40,0,1,""],Blame:[40,0,1,""],DecryptionKey:[40,0,1,""],EncryptionKey:[40,0,1,""],Hash:[40,0,1,""],InputSignature:[40,0,1,""],Invalid:[40,0,1,""],Message:[40,0,1,""],Packet:[40,0,1,""],Packets:[40,0,1,""],Phase:[40,0,1,""],Reason:[40,0,1,""],Registration:[40,0,1,""],Signature:[40,0,1,""],Signed:[40,0,1,""],Transaction:[40,0,1,""],VerificationKey:[40,0,1,""]},receiver:{Receiver:[16,3,1,""],authenticate:[33,4,1,""],objectify:[34,4,1,""],packetify:[35,4,1,""],phase:[36,4,1,""],session:[37,4,1,""],store:[38,4,1,""]},session:{Session:[1,1,1,""]},signing:{Signing:[17,3,1,""],bitcore:[39,4,1,""]}},objnames:{"0":["js","function","JavaScript function"],"1":["js","class","JavaScript class"],"2":["js","attribute","JavaScript attribute"],"3":["js","interface","interface"],"4":["js","moduledoc","moduledoc"]},objtypes:{"0":"js:function","1":"js:class","2":"js:attribute","3":"js:interface","4":"js:moduledoc"},terms:{"010203a0b0c0":41,"020db431245713add097421a29ec3089f01587a3808d1043fee5956fc5e08effcd":5,"034115e5452127bb9409f727539fa054281dd2bb6909725886aa5d90628d42fd1":[],"0x01":41,"0x02":41,"0x03":41,"0xa0":41,"0xb0":41,"0xc0":41,"23ce":[],"3044022020ea35009d17d25b8a926675ddf0045c397d3df55b0ae115ef80db7849":5,"529b9302201f13bd2cbd1ca0a24e2c5ab28030aa9b7b3dcacf175652dad82fe9d5":5,"6th":40,"973f340901":5,"boolean":[1,5],"byte":40,"case":41,"class":[1,2,21,22,23,25,26,28,29,30,31,32,33,34,35,36,37,38],"const":[5,24,27,28,29,30,41],"default":[1,6,17,36,37,38],"export":[6,17],"final":1,"function":[0,2,6,17,27,28,29,30,36,37,38],"import":[24,27,28,29,30],"instanceof":2,"new":[24,27,28,29,30,38],"null":[1,10,22,23,35,36,37],"public":[1,5,6,17,36,37,40],"return":[1,5,6,9,10,11,12,17,23,36,37],"static":30,"throw":[1,5,6,9,10,11,12,13,14,15,17,25],"true":5,For:1,The:[1,5,6,10,23,40,41],Used:[1,5,40],Uses:[19,20,25,26,27,29,31,32,39,41],Will:1,accept:7,access:40,accus:40,acquir:[11,12],activ:[6,17],add:[5,10,24,30],added:[5,10],addit:1,address:[1,5,17,40,41],addtransactionsignatur:5,affix:1,all:[1,2,5,36,37,38],allow:[2,41],alreadi:[8,11,12,14,15],amount:[1,2,5,40],ampersand:1,ani:[1,5,8],announc:[1,40],announceparam:1,announcereturn:1,anoth:[10,11,12,14,15],argument:[1,5,6,7,10,13,14,15,16,17,21,22,23,25,26,28,29,30,31,32,33,34,35,36,37,38,40],arrai:[1,5,23,38,40],arraybuff:[1,6,12,15],arriv:10,ascend:1,associ:5,assum:[1,34,35],async:[27,28,29,30],attempt:1,authent:[3,18,40],authenticatereceiv:33,authenticatereceiverparam:33,avaialbl:39,avail:[2,19,20],await:[27,28,29,30],bad:2,band:40,base64:[1,3,5,6,17],base:[2,19,20,25,26,29,31,32,39],been:[6,17],befor:[10,40],big:[40,41],binari:[12,15,25,31,41],bit:40,bitcoin:[1,3,5,6,17,19,33,40,41],bitcoincash:5,bitcor:[1,3,6,17,18,33],blame:[1,40],blind:40,bookmoon:[17,19,20,39],broadcast:[1,5,40],broadcastoutput:1,broadcasttransact:5,buffer:[26,32],busi:2,busyerror:[3,5,10,11,12,14,15],call:[5,6,17],can:2,cash:[1,3,5,6,17,19,20,33,39,40,41],cashaddr:[1,3,5,17,40],cashshuffl:[0,1,2,3,4,18,24,25,27,28,29,30,31,40],cashshuffleerror:3,cashshufflej:40,caus:[1,7,9],chang:[1,5],changeaddress:[1,5],channel:[1,11,12,13,14,15,21,22,25,31],charact:41,charg:[1,5],check:5,checkequivoc:1,client:[1,3],coin:[1,3,4,18],coinshuffl:[1,40],comparison:5,complet:41,configur:[6,17,40],conform:[2,41],consol:[3,18,28,30],consolelogchan:[27,28,30],construct:[1,5],constructor:[2,22,25,26,29,31,32],contain:[1,35,36,37],control:5,convert:34,core:[1,40],count:40,crypto:[1,3,4,18],cryptogram:[1,6],custom:[2,41],data:[2,26,32,41],decim:[5,41],decrypt:[1,6,40],decryptionkei:40,decryptoutputlist:1,dedupl:1,defin:[5,6,9,11,12,14,15,16,17,40],definit:[1,2,4,25,31,33,34,35],delimit:[1,15],deliv:[10,11,12,14,15,28,31,32,33,34,35,38],deliveri:[10,14,15,24],depend:10,descript:40,detach:[1,17],detail:[5,9,40],detect:[1,2],digest:1,digit:[40,41],discard:[1,3,4,6,8,17,18,33,35,36,37,38],distribut:[3,18],distributelogchan:28,doc:2,doe:[1,2],doubl:40,doublespend:40,draw:8,drawer:[3,4,18],drawn:8,duplic:[1,28],dure:37,each:[1,3,5,15,18,21,30,36,37,41],eachfetch:23,ecdsa:[6,17],eci:[6,20],effect:8,element:5,empti:[1,2,10],emptyerror:[3,10],enabl:[5,40],encod:[1,41],encount:2,encrypt:[1,6,20,40],encryptedoutputlist:1,encryptionkei:40,encryptionkeypair:1,encryptionpublickei:1,encryptlay:1,encryptor:1,endian:[40,41],enhanc:3,enter:1,entir:1,enumer:40,envelop:40,equivoc:[1,40],equivocationcheck:40,equivocationcheckparam:1,equivocationfailur:40,error:[3,7,38],errormessagepair:7,event:1,exampl:[5,24,27,28,29,30,41],execut:1,exhaust:[1,2],exhaustionerror:[1,3],expect:[2,26],expir:[1,10],explain:7,exportprivatekei:[6,17],exportpublickei:[6,17],express:5,extens:[1,40],extract:35,factori:[36,37],fail:[1,5,9,13,25,33],failur:[1,40],featur:2,fee:[1,5],fetch:[9,23],fetcher:[3,4,18],field:1,fifo:[3,18,38],fifoinbox:[24,36,38],file:[3,18,28],filelogchan:[28,29],filenam:41,filepath:29,find:2,first:1,firstparticip:[],forev:[10,23],format:[2,40,41],formaterror:[3,25],from:[1,5,6,8,9,10,11,12,17,23,24,25,26,27,28,29,30,35,36],from_kei:40,full:5,fund:[1,5,40],gather:1,gatherannounc:1,gatherannounceparam:1,gatherdigest:1,gatherdigestparam:1,gatherfinaloutput:1,gatherfinaloutputparam:1,gatheroutputlist:1,gatheroutputlistparam:1,gathersignatur:1,gathersignatureparam:1,gener:[1,6,17],generatekeypair:[6,17],get:[5,17],given:5,handl:[36,37],has:[1,5,6,17],hash:[1,5,6,20,40],hex:[5,6,17,36,37],hexadecim:41,hexstr:[1,3,5,6,17,36,37],home:[28,29],identifi:[1,37,40],immedi:10,implement:[2,5,6,9,10,11,12,14,15,16,17,18,19,20,25,26,29,31,32,39,40],inadequ:2,inadequateerror:[1,3],inbox:[3,4,9,18,23,36,38],inboxfactori:36,inchan:[3,4,8,18,22],inchanbin:[3,4,18],inchanbininchan:25,index:[1,5,36,37,40],indic:2,input:[1,5,11,12,22,25,40],inputaddress:[1,5],inputindex:5,inputpublickei:[],inputsignatur:[1,5,40],insensit:41,instanc:[1,5,9,19,20,25,26,28,31,32,33,34,35,36,37,38,39],insuffici:[1,40],insufficientfund:40,integ:[1,40],integr:40,interfac:[1,2,3,5,6,7,8,9,10,11,12,13,14,15,16,17,18],intern:[6,17],interpret:41,invalid:[1,40],invalidformat:40,invalidsignatur:40,isntanc:33,item:[1,2],iter:[1,5,23,28,36,37],its:37,javascript:3,join:[],kei:[1,5,6,17,19,20,36,37,39,40],label:36,last:1,lastparticip:1,layer:1,left:40,length:40,level:0,lexicograph:1,liar:40,lib:[19,20,39],librari:3,limit:[2,10],list:[1,40],littl:41,log:[1,3,13,18,22,27,28,29,30],logchan:[1,3,4,18,21,22],logconsol:[28,30],logdiscard:21,logfil:28,logic:1,longer:2,mainnet:[1,5,6,17],make:[1,5],makeunsignedtransact:5,map:[1,5,36,37],max:1,maximum:[1,2,10,23],mean:[11,12,14,15],mention:21,messag:[1,5,6,7,8,9,10,11,12,13,14,15,16,17,19,20,21,22,23,24,25,28,30,31,33,34,35,36,37,38,39,40],message1:24,message2:24,message3:24,messageannounc:1,messageannounceparam:1,messagedigest:1,messagedigestparam:1,messagefinaloutput:1,messagefinaloutputparam:1,messageoutputlist:1,messageoutputlistparam:1,messagesignatur:1,messagesignatureparam:1,method:[2,5],millisecond:[1,10,23],minimum:1,miss:[1,2,40],missingfeatureerror:3,missingoutput:40,missingvalueerror:[1,3,6,17],modul:[1,3,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39],more:5,multinput:5,multioutput:5,multisignatur:5,must:26,name:[2,5],need:2,network:[1,5,6,11,12,14,15,17,19,20,33,39,40],next:[1,8,10,11,12,33,34,35,40],nextlogchan:30,nextparticip:1,nextreceiv:[33,34,35],node:[26,29,32],nodestream:[3,18],nodestreaminchanbin:26,nodestreamoutchanbin:32,none:[1,40],nonempti:[2,10],notimplementederror:[1,3],now:1,number:[1,5,10,23,37,40,41],object:[1,25,26,31,32,34,36,37],objectifi:[3,18],objectifyreceiv:34,octet:41,old:[6,17],oper:[1,2,5,6,10,17,19,20,39],option:[10,33,35,36,37,38],order:[1,10,11,12,14,15,23,24,40,41],orderparticip:1,other:[1,5,11,12,14,15],out:[1,40],outchan:[1,3,4,18],outchanbin:[3,4,18],outchanbinoutchan:31,output:[1,5,14,15,27,31,40],outputaddress:[1,5],outputkeypair:1,outputlist:1,outputparam:1,outputreturn:1,over:5,own:1,p2pkh:5,packag:[1,40],packagesignedpacket:1,packet:[1,14,33,34,35,40],packetifi:[3,18],packetifyreceiv:35,pair:[1,5,6,7,17,41],param:[1,33],paramet:2,pars:25,particip:[1,5,11,12,14,15,36,37,40],participantaddress:5,participantinbox:36,participantnumb:[],partwai:8,pass:[30,33,34,35],path:29,pattern:9,perform:[1,6,17],phase:[1,3,18,37,40],phaseidentifi:37,phasereceiv:[1,36,37],phasereceiverfactori:37,plain:34,plaintext:5,pool:1,poolnumb:1,portion:1,posit:1,possibl:5,preced:40,prefix:[3,18],prefixlogchan:30,prior:[1,6,17],priorparticip:1,priorreceiv:1,privaci:3,privat:[5,6,17],privatekeystr:[5,6,17],process:1,produc:[1,5],progress:[11,12,14,15],promis:8,protobuf:40,protobufj:[1,25,31,33,34,35],protocol:[1,3,5,8,11,14,15,16,25,31,33,34,35,37],provid:[1,5,8,22,25,26,29,31,32,33,34,35,36,37,38,40],publickeystr:5,qr975e2q784jnk0pq2rrk9enuywttyhxryfkyuyjq3:5,rang:5,raw:[12,15,25,31],read:[25,26],readabl:26,readi:1,reason:[38,40],receiv:[1,2,3,4,7,8,10,11,12,18,22,24,25,26],recipi:[6,28,40],recurs:1,registr:40,reject:8,relai:[8,22,30],remov:10,repeat:1,repeatedli:8,replac:[6,17],repres:[5,40,41],request:40,requir:[2,5],resourc:2,respond:16,respons:[],restor:[6,17],restorekeypair:[6,17],result:1,rfc:41,root:[1,25,31,33,34,35],rout:[36,37],run:[1,5,10,27,28,29,30],runparam:1,runreturn:1,safe:41,same:[1,23],satoshi:[1,5],save:[6,17],second:1,see:2,send:[13,14,15,27,28,29,30,32],sender:[36,40],sequenc:40,seri:41,server:[],session:[0,3,5,18,40],sessionid:1,sessionparam:[],sessionpublickei:5,sessionreceiv:[1,37],set:[5,28],sever:[5,40],sha:6,should:1,show:1,shuffl:[1,40],shuffleequivocationfailur:40,shufflefailur:40,shuffleparam:1,shuffler:30,shufflereturn:1,sighash_al:5,sign:[1,3,4,5,11,18,33,35,40],signatur:[1,5,17,33,40],signedpacket:1,signer:5,signifi:41,signingkeypair:1,signingpublickei:1,signtransact:[],signtransactioninput:5,singl:1,special:7,specif:36,specifi:[2,5],spend:40,standard:[3,18,19,20,39,41],standarddraw:22,start:[8,27,28,29,30,40],stop:8,store:[3,18],storereceiv:38,str:[1,40],stream:[26,32],string:[1,2,5,6,13,17,29,30,36,37,40,41],structur:9,subclass:2,submiss:5,submit:[1,5,7,16,33,34,35,36,37,38,40],submitparam:1,submitreturn:1,subsequ:[1,6,17,30],success:[1,2],suffici:[1,5],sufficientfund:5,support:[5,6,17,26],symbol:[],take:2,termin:15,test:24,text:6,than:2,them:8,themselv:40,thi:[1,5,25,31,40],through:[1,8,19,20,39],thrown:2,time:[1,2,10,23],timeout:[1,2,10,23],timeouterror:[1,3,10],to_kei:40,top:0,transact:[1,3,5,40],transfer:5,type:[1,2,3,5,6,8,9,17,36,37,40],uint32:40,uint64:40,unari:1,unicod:[],unisng:1,unrecogn:[36,37],unshift:26,unsign:[1,5,40],unspecifi:5,until:[1,8],url:41,usag:5,use:[1,5,6,17],used:[6,17],user:[28,29],uses:[37,40],usual:41,utf:[],valid:[1,5,34,35,40],valu:[1,2,5,6,8,17,19,20,36,37,39,40,41],valueerror:[1,3],variabl:40,variou:5,verif:[19,40],verifi:[1,5,33,40],verificationkei:40,verificationsubmiss:40,verifysignatur:5,verifytransactionsignatur:5,verror:2,violat:40,wai:16,wait:[1,10,23],watch:[8,10],well:[1,5],when:2,whether:[1,5],wire:40,without:[1,2],work:[1,5],writabl:32,write:[13,32],you:2,your:3},titles:["Client","Session","Error"," cashshufflejs documentation","Interface","Coin","Crypto","Discarder","Drawer","Fetcher","Inbox","Inchan","Inchanbin","Logchan","Outchan","Outchanbin","Receiver","Signing","Module","coin/bitcore","crypto/bitcore","discarder/log","drawer/standard","fetcher/each","inbox/fifo","inchan/inchanbin","inchanbin/nodestream","logchan/console","logchan/distribute","logchan/file","logchan/prefix","outchan/outchanbin","outchanbin/nodestream","receiver/authenticate","receiver/objectify","receiver/packetify","receiver/phase","receiver/session","receiver/store","signing/bitcore","Protocol","Type"],titleterms:{authent:33,avatar:3,base64:41,bitcor:[19,20,39],busyerror:2,cashaddr:41,cashshuffleerror:2,cashshufflej:3,client:0,coin:[5,19],consol:27,crypto:[6,20],discard:[7,21],distribut:28,document:3,drawer:[8,22],each:23,emptyerror:2,error:2,exhaustionerror:2,fetcher:[9,23],fifo:24,file:29,formaterror:2,hexstr:41,inadequateerror:2,inbox:[10,24],inchan:[11,25],inchanbin:[12,25,26],interfac:4,log:21,logchan:[13,27,28,29,30],missingfeatureerror:2,missingvalueerror:2,modul:18,nodestream:[26,32],notimplementederror:2,objectifi:34,outchan:[14,31],outchanbin:[15,31,32],packetifi:35,phase:36,prefix:30,protocol:40,receiv:[16,33,34,35,36,37,38],session:[1,37],sign:[17,39],standard:22,store:38,timeouterror:2,type:41,valueerror:2}})