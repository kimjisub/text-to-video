import 'package:flutter/material.dart';
import 'package:ttv/main.dart';
class textfield extends StatelessWidget {
  const textfield({
    Key key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final textController = TextEditingController();
    return Column(
      crossAxisAlignment: CrossAxisAlignment.end,
      children: [
        Container(
          child: Padding(
            padding: const EdgeInsets.symmetric(horizontal: 40, vertical: 30),
            child: TextField(
              controller: textController,
              onSubmitted: textdata(textController.text), // text data 넘겨줌.
              decoration: new InputDecoration.collapsed(
                  hintText: "Please enter text here",
                  hintStyle:
                      TextStyle(fontSize: 25, fontFamily: 'NanumSquare'),
                  ),
                  cursorColor: Colors.orange,
                  
              maxLines: null,
            ),
          ),
          height: 380,
          width: 950,
          decoration: BoxDecoration(
            color: Color(0xFFf8fafb),
            borderRadius: BorderRadius.circular(25),
            boxShadow: [
              BoxShadow(
                color: Colors.grey.withOpacity(0.5),
                spreadRadius: 1,
                blurRadius: 20,
                offset: Offset(9, 9), // changes position of shadow
              ),
            ],
          ),
          margin: EdgeInsets.all(5),
        ),
        SizedBox(height: 20,),
        InkWell(
          onTap: () {
            if(textController.text.length <= 100){
               Scaffold.of(context)
                .showSnackBar(SnackBar(content: Text('기사를 첨부해 주세요! (100자 이상)')));
            }else{
            textdata(textController.text);
            Scaffold.of(context)
                .showSnackBar(SnackBar(content: Text('성공적으로 서버에 전송되었습니다.\n\n\n ${textController.text}')));
             Future.delayed(const Duration(milliseconds: 1500),(){
                Navigator.pushNamed(context, '/video');
             });
             
          }},
          borderRadius: BorderRadius.circular(20),
          child: Container(
            height: 70,
            width: 190,
            margin: EdgeInsets.all(5),
            child: Center(
                child: Text(
              'RENDER',
              style: TextStyle(
                fontSize: 25,
                color: Colors.white,
                fontFamily: 'GmarketSans',
              ),
            )),
            decoration: BoxDecoration(
              gradient: LinearGradient(
                  colors: [Color(0xFFff5f6d), Color(0xfFFfc371)]),
              borderRadius: BorderRadius.circular(20),
              boxShadow: [
                BoxShadow(
                  color: Colors.grey.withOpacity(0.8),
                  spreadRadius: 2,
                  blurRadius: 10,
                  offset: Offset(2, 6), // changes position of shadow
                ),
              ],
            ),
          ),
        )
      ],
    );
  }

  textdata(String data) {
    //data 는 기사 입력받은 문자열
    ////////////////////////////////텍스트필트에서 받아온 데이터./////////////////////////////////////////
  }
}
