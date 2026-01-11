<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;
use App\Models\About;
use App\Models\Ceo;
use App\Models\User;
use Illuminate\Support\Facades\Log;

class AboutController extends Controller
{
    public function index() {
        $about = About::first();
        $users = User::whereNotIn('role', ['user', 'admin'])->get();
        $categories = Category::where('parent_id',null)->where('type','menu')->with('children')->get();
        $eventCategories = Category::where('parent_id',null)->where('type','event')->with('children')->get();
        return inertia('Client/About', [
            'about' => $about,
            'users' => $users,
            'categories' => $categories,
            'eventCategories' => $eventCategories
        ]);
    }

    public function create()
    {
        $about = About::first();
        return inertia('Admin/About/Create', ['abt' => $about]);
    }

    public function adminIndex()
    {
        $about = About::first();
        return inertia('Admin/About/Index', ['about' => $about]);
    }

    public function store(Request $request)
    {

        //Log::info('The Store function called', ['request' => $request->all()]);
        
        $validated = $request->validate([
            'title_en' => 'required|string|max:255',
            'title_fr' => 'required|string|max:255',
            'title_ar' => 'required|string|max:255',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
            'short_description_en' => 'required|string',
            'short_description_fr' => 'required|string',
            'short_description_ar' => 'required|string',
            'paragraph_1_en' => 'required|string',
            'paragraph_1_fr' => 'required|string',
            'paragraph_1_ar' => 'required|string',
            'title_2_en' => 'nullable|string|max:255',
            'title_2_fr' => 'nullable|string|max:255',
            'title_2_ar' => 'nullable|string|max:255',
            'paragraph_2_en' => 'nullable|string',
            'paragraph_2_fr' => 'nullable|string',
            'paragraph_2_ar' => 'nullable|string',
            'pictures.*' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048'
        ]);

        $about = About::firstOrNew();
        //$about->fill($validated);

        $about->title = json_encode([
            'en' => $request->input('title_en'),
            'ar' => $request->input('title_ar'),
            'fr' => $request->input('title_fr'),
        ]);
    
        $about->short_description = json_encode([
            'en' => $request->input('short_description_en'),
            'ar' => $request->input('short_description_ar'),
            'fr' => $request->input('short_description_fr'),
        ]);
    
        $about->paragraph_1 = json_encode([
            'en' => $request->input('paragraph_1_en'),
            'ar' => $request->input('paragraph_1_ar'),
            'fr' => $request->input('paragraph_1_fr'),
        ]);
    
        $about->title_2 = json_encode([
            'en' => $request->input('title_2_en'),
            'ar' => $request->input('title_2_ar'),
            'fr' => $request->input('title_2_fr'),
        ]);
    
        $about->paragraph_2 = json_encode([
            'en' => $request->input('paragraph_2_en'),
            'ar' => $request->input('paragraph_2_ar'),
            'fr' => $request->input('paragraph_2_fr'),
        ]);

        $imagePath = null;
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->storePublicly('pictures/about');
            $about->image = $imagePath;
        }

        // Handle pictures
        for ($i = 1; $i <= 5; $i++) {
            if ($request->hasFile("pictures.$i")) {
                $path = $request->file("pictures.$i")->storePublicly('pictures/about');
                $about->{"picture_$i"} = $path;
            }
        }
        //Log::info('The Store function called', ['about' => $about]);

        $about->save();

        return redirect()->route('admin.about.index')->with('success', 'About section updated successfully!');
    }

    public function createCeo()
    {
        $ceo = Ceo::first();
        return inertia('Admin/Ceo/Create', ['abt' => $ceo]);
    }

    public function storeCeo(Request $request)
    {

        //Log::info('The Store function called', ['request' => $request->all()]);
        
        // $validated = $request->validate([
        //     'title_en' => 'required|string|max:255',
        //     'title_fr' => 'required|string|max:255',
        //     'title_ar' => 'required|string|max:255',
        //     'name_en' => 'required|string|max:255',
        //     'name_fr' => 'required|string|max:255',
        //     'name_ar' => 'required|string|max:255',
        //     'paragraph_1_en' => 'required|string',
        //     'paragraph_1_fr' => 'required|string',
        //     'paragraph_1_ar' => 'required|string',
        //     'paragraph_2_en' => 'nullable|string',
        //     'paragraph_2_fr' => 'nullable|string',
        //     'paragraph_2_ar' => 'nullable|string',
        // ]);

        //Log::info('The Store function called', ['validated' => $validated]);

        $ceo = Ceo::firstOrNew();

        $ceo->title = json_encode([
            'en' => $request->input('title_en'),
            'ar' => $request->input('title_ar'),
            'fr' => $request->input('title_fr'),
        ]);

        $ceo->name = json_encode([
            'en' => $request->input('name_en'),
            'ar' => $request->input('name_ar'),
            'fr' => $request->input('name_fr'),
        ]);
    
        $ceo->paragraph_1 = json_encode([
            'en' => $request->input('paragraph_1_en'),
            'ar' => $request->input('paragraph_1_ar'),
            'fr' => $request->input('paragraph_1_fr'),
        ]);
    
        $ceo->paragraph_2 = json_encode([
            'en' => $request->input('paragraph_2_en'),
            'ar' => $request->input('paragraph_2_ar'),
            'fr' => $request->input('paragraph_2_fr'),
        ]);

        $imagePath = null;
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->storePublicly('pictures/ceo');
            $ceo->image = $imagePath;
        }

        $ceo->save();

        return redirect()->route('admin.ceo.create')->with('success', 'Ceo information updated successfully!');
    }
}
