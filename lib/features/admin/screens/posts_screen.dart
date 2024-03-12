import 'package:amazon_clone/constants/global_variables.dart';
import 'package:amazon_clone/features/admin/screens/add_product_screen.dart';
import 'package:flutter/material.dart';

class PostsScreen extends StatefulWidget {
  const PostsScreen({super.key});

  @override
  State<PostsScreen> createState() => _PostsScreenState();
}

class _PostsScreenState extends State<PostsScreen> {
  void navigateToAddProduct() {
    Navigator.pushNamed(context, AddProductScreen.routeName);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: const Center(
        child: Text('Products'),
      ),
      floatingActionButton: FloatingActionButton(
        tooltip: 'Add a product',
        onPressed: navigateToAddProduct,
        backgroundColor: GlobalVariables.selectedNavBarColor,
        child: const Icon(Icons.add),
      ),
      floatingActionButtonLocation: FloatingActionButtonLocation.centerFloat,
    );
  }
}
