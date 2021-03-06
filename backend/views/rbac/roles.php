<?php
/**
 * Author: lf
 * Blog: https://blog.feehi.com
 * Email: job@feehi.com
 * Created at: 2017-09-12 11:50
 */

/**
 * @var $this yii\web\View
 * @var $dataProvider yii\data\ArrayDataProvider
 * @var $searchModel \backend\models\search\RBACRoleSearch
 */

use backend\grid\GridView;
use backend\grid\SortColumn;
use backend\widgets\Bar;
use yii\helpers\Html;
use yii\helpers\Url;
use backend\grid\CheckboxColumn;
use backend\grid\ActionColumn;

$this->title = "Roles";
$this->params['breadcrumbs'][] = Yii::t('app', 'Roles');
?>
<div class="row">
    <div class="col-sm-12">
        <div class="ibox">
            <?= $this->render('/widgets/_ibox-title') ?>
            <div class="ibox-content">
                <?= Bar::widget([
                    'buttons' => [
                        'create' => function () {
                            return Html::a('<i class="fa fa-plus"></i> ' . Yii::t('app', 'Create'), Url::to(['role-create']), [
                                'title' => Yii::t('app', 'Create'),
                                'data-pjax' => '0',
                                'class' => 'btn btn-white btn-sm',
                            ]);
                        },
                        'delete' => function () {
                            return Html::a('<i class="fa fa-trash-o"></i> ' . Yii::t('app', 'Delete'), Url::to(['role-delete']), [
                                'title' => Yii::t('app', 'Delete'),
                                'data-pjax' => '0',
                                'param-sign' => 'name',
                                'data-confirm' => Yii::t('app', 'Really to delete?'),
                                'class' => 'btn btn-white btn-sm multi-operate',
                            ]);
                        }
                    ],
                    'template' => '{refresh} {create} {delete}'
                ]) ?>
                <?= GridView::widget([
                    'dataProvider' => $dataProvider,
                    'filterModel' => $searchModel,
                    'columns' => [
                        [
                            'class' => CheckboxColumn::className(),
                            'checkboxOptions' => function ($model, $key, $index, $column) {
                                return ['value' => $model->name];
                            }
                        ],
                        [
                            'attribute' => 'name',
                            'label' => Yii::t("app", "Name"),
                        ],
                        [
                            'attribute' => 'description',
                            'label' => Yii::t("app", "Description"),
                        ],
                        [
                            'class' => SortColumn::className(),
                            'primaryKey' => function($model){
                                return ["name" => $model['name']];
                            },
                            'action' => Url::to(['role-sort']),
                            'label' => Yii::t("app", "Sort"),
                        ],
                        [
                            'class' => ActionColumn::className(),
                            'width' => '190px',
                            'buttons' => [
                                'view-layer' => function($url, $model, $key){
                                    return Html::a('<i class="fa fa-folder"></i> ', 'javascript:void(0)', [
                                        'title' => Yii::t('yii', 'View'),
                                        'onclick' => "viewLayer('" . Url::to(['role-view-layer', 'name' => $model->name]) . "',$(this))",
                                        'data-pjax' => '0',
                                        'class' => 'btn',
                                        'url' =>  Url::to(['role-view-layer', 'name' => $model->name]),
                                    ]);
                                },
                                'update' => function ($url, $model, $key) {
                                    return Html::a('<i class="fa  fa-edit" aria-hidden="true"></i> ', Url::to([
                                        'role-update',
                                        'name' => $model['name']
                                    ]), [
                                        'title' => Yii::t('app', 'Update'),
                                        'data-pjax' => '0',
                                        'class' => 'btn J_menuItem',
                                    ]);
                                },
                                'delete' => function ($url, $model) {
                                    return Html::a('<i class="fa fa-trash-o"></i> ', Url::to(['role-delete', 'name'=>$model['name']]), [
                                        'title' => Yii::t('app', 'Delete'),
                                        'data-pjax' => '0',
                                        'data-confirm' => Yii::t('app', 'Are you sure you want to delete this item?'),
                                        'class' => 'btn',
                                    ]);
                                },
                            ],
                            'template' => '{view-layer} {update} {delete}',
                        ]
                    ]
                ]) ?>
            </div>
        </div>
    </div>
</div>