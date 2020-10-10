import 'package:flutter/material.dart';
import 'widgets/Textfield.dart';
import 'package:flutter_swiper/flutter_swiper.dart';

//import 'aboutscreen.dart';
void main() => runApp(MyApp());
class MyApp extends StatelessWidget { //
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
        color: Colors.orange,
        title: 'Text-to-Video',
        initialRoute: '/',
        routes: {
          '/': (context) => HomeScreen(),
          '/about': (context) => AboutScreen(),
          '/video': (context) => VideoScreen(),
        });
  }
}

class HomeScreen extends StatefulWidget { // 기사를 복붙해 넣는 첫 메인 화면
  @override
  _HomeScreenState createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  @override
  Widget build(BuildContext context) {
    final Size size = MediaQuery.of(context).size;

    return Scaffold(
        body: Column(
      mainAxisAlignment: MainAxisAlignment.start,
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
          padding:
              const EdgeInsets.only(top: 40, left: 20, right: 20, bottom: 20),
          child: top(),
        ),
        Padding(
          padding: const EdgeInsets.only(bottom: 20),
          child: Center(
            child: Text(
              '------------- How To Use  ----------------------\n -------------------------',
              style: TextStyle(
                  fontFamily: 'GmarketSansL',
                  color: Color(0xFF868e96),
                  fontSize: 25),
            ),
          ),
        ),
        Center(
          child: textfield(),
        ),
      ],
    ));
  }
}

class top extends StatelessWidget { // 위에 탭바를 만들려고 했는데.. 
  const top({
    Key key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 80,
      width: 500,
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceEvenly,
        children: [
          Center(
            child: InkWell(
              onTap: () {
                Navigator.pushNamed(context, '/');
              },
              borderRadius: BorderRadius.circular(10),
              child: Container(
                height: 80,
                child: Image.asset(
                  'lib/assets/logo.png',
                  scale: 10,
                ),
              ),
            ),
          ),
          InkWell(
            onTap: () {
              Navigator.pushNamed(context, '/');
            },
            borderRadius: BorderRadius.circular(10),
            child: Container(
              height: 30,
              child: Column(
                mainAxisAlignment: MainAxisAlignment.start,
                children: [
                  Text(
                    'RENDERING',
                    style: TextStyle(fontFamily: 'GmarketSans', fontSize: 17),
                  ),
                  SizedBox(
                    height: 3,
                  ),
                  Container(
                    height: 3,
                    width: 80,
                    decoration: BoxDecoration(
                      gradient: LinearGradient(
                          colors: [Color(0xFFff5f6d), Color(0xfFFfc371)]),
                    ),
                  ),
                ],
              ),
            ),
          ),
          InkWell(
            onTap: () {
              Navigator.pushNamed(context, '/about');
            },
            borderRadius: BorderRadius.circular(10),
            child: Container(
              height: 30,
              child: Column(
                children: [
                  Text(
                    'ABOUT US',
                    style: TextStyle(fontFamily: 'GmarketSans', fontSize: 17),
                  ),
                  SizedBox(
                    height: 3,
                  ),
                  Container(
                    height: 3,
                    width: 80,
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}

class top2 extends StatelessWidget { // 이것도,, 
  const top2({
    Key key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 80,
      width: 500,
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceEvenly,
        children: [
          InkWell(
            onTap: () {
              Navigator.pushNamed(context, '/');
            },
            borderRadius: BorderRadius.circular(10),
            child: Container(
              height: 80,
              child: Image.asset(
                'lib/assets/logo.png',
                scale: 10,
              ),
            ),
          ),
          InkWell(
            onTap: () {
              Navigator.pushNamed(context, '/');
            },
            borderRadius: BorderRadius.circular(10),
            child: Container(
              height: 30,
              child: Column(
                mainAxisAlignment: MainAxisAlignment.start,
                children: [
                  Text(
                    'RENDERING',
                    style: TextStyle(fontFamily: 'GmarketSans', fontSize: 17),
                  ),
                  SizedBox(
                    height: 3,
                  ),
                  Container(
                    height: 3,
                    width: 80,
                  ),
                ],
              ),
            ),
          ),
          InkWell(
            onTap: () {
              Navigator.pushNamed(context, '/about');
            },
            borderRadius: BorderRadius.circular(10),
            child: Container(
              height: 30,
              child: Column(
                children: [
                  Text(
                    'ABOUT US',
                    style: TextStyle(fontFamily: 'GmarketSans', fontSize: 17),
                  ),
                  SizedBox(
                    height: 3,
                  ),
                  Container(
                    height: 3,
                    width: 80,
                    decoration: BoxDecoration(
                      gradient: LinearGradient(
                          colors: [Color(0xFFff5f6d), Color(0xfFFfc371)]),
                    ),
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}

class VideoScreen extends StatelessWidget { //비디오 출력, 다운해주는 화면 구성
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        body: Column(
      mainAxisAlignment: MainAxisAlignment.start,
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
          padding:
              const EdgeInsets.only(top: 40, left: 20, right: 20, bottom: 20),
          child: top(),
        ),
        Center(
          child: Column(
            children: [
              Stack(children: [
                Container(
                  height: 450,
                  width: 850,
                  decoration: BoxDecoration(
                    gradient: LinearGradient(
                        colors: [Color(0xFFff5f6d), Color(0xfFFfc371)]),
                    // borderRadius: BorderRadius.circular(20),
                  ),
                  margin: EdgeInsets.all(5),
                ),
                Positioned(
                  right: 15,
                  top: 15,
                  child: Container(
                    height: 430,
                    width: 830,
                    decoration: BoxDecoration(
                      //borderRadius: BorderRadius.circular(20),
                      color: Color(0xFFf8fafb),
                    ),
                  ),
                ),
                Positioned(
                    top: 180,
                    right: 375,
                    width: 90,
                    height: 90,
                    child: Image.asset('lib/assets/videologo.png'))
              ]),
              SizedBox(
                height: 20,
              ),
              InkWell(
                onTap: () {},
                borderRadius: BorderRadius.circular(20),
                child: Container(
                  height: 70,
                  width: 200,
                  margin: EdgeInsets.all(5),
                  child: Center(
                      child: Text(
                    'DOWNLOAD',
                    style: TextStyle(
                      fontSize: 23,
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
              ),
              SizedBox(
                height: 20,
              ),
              Text(
                'Do you want to render again? Click here',
                style: TextStyle(fontFamily: 'GmarketSansL'),
              ),
            ],
          ),
        ),
      ],
    ));
  }
}

class AboutScreen extends StatelessWidget { //ABOUT US 화면 
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        body: Column(
      mainAxisAlignment: MainAxisAlignment.start,
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
          padding:
              const EdgeInsets.only(top: 40, left: 20, right: 20, bottom: 20),
          child: top2(),
          
        ),
        Container(
          height: 300,
          width: 1000,
          child: Swiper(
            itemCount: 5,
            itemBuilder: (BuildContext context,int index){
              return Container(
                height: 200,
                width: 200,
                color: Colors.orange,
                );
            },
          ),
        ),
      ],
    ));
  }
}

